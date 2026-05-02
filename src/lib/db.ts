import { supabase } from './supabase';
import type { Enums, Tables } from './database.types';
import type { Product } from './catalog';

// ─────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────

export type DbProduct = Tables<'products'> & {
  images: Tables<'product_images'>[];
  colors: string[];
  sizes: string[];
  customization: string[];
};

export type DbSlot = Tables<'availability_slots'>;

export type ProductCategory = Enums<'product_category'>;
export type ServiceType = Enums<'service_type'>;
export type LocationType = Enums<'location_type'>;

// ─────────────────────────────────────────
// MAPPER
// ─────────────────────────────────────────

export function toProduct(p: DbProduct): Product {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category as Product['category'],
    collection: p.collection,
    description: p.description,
    shortDescription: p.short_description,
    price: p.price,
    images: p.images.map((img) => img.url),
    colors: p.colors,
    sizes: p.sizes,
    fabric: p.fabric,
    customization: p.customization,
    isNewArrival: p.is_new_arrival,
    whatsappMessage: p.whatsapp_message,
    aliases: p.aliases ?? undefined,
  };
}

// ─────────────────────────────────────────
// PRODUCTS
// ─────────────────────────────────────────

async function attachVariants(products: Tables<'products'>[]): Promise<DbProduct[]> {
  if (products.length === 0) return [];
  const ids = products.map((p) => p.id);

  const [{ data: images }, { data: variants }] = await Promise.all([
    supabase
      .from('product_images')
      .select('*')
      .in('product_id', ids)
      .order('position'),
    supabase
      .from('product_variants')
      .select('*')
      .in('product_id', ids),
  ]);

  return products.map((p) => ({
    ...p,
    images: (images ?? []).filter((i) => i.product_id === p.id),
    colors: (variants ?? []).filter((v) => v.product_id === p.id && v.type === 'color').map((v) => v.value),
    sizes: (variants ?? []).filter((v) => v.product_id === p.id && v.type === 'size').map((v) => v.value),
    customization: (variants ?? []).filter((v) => v.product_id === p.id && v.type === 'customization').map((v) => v.value),
  }));
}

export async function getProducts(category?: ProductCategory): Promise<DbProduct[]> {
  let query = supabase.from('products').select('*').order('position');
  if (category) query = query.eq('category', category);
  const { data, error } = await query;
  if (error || !data) return [];
  return attachVariants(data);
}

export async function getNewArrivals(): Promise<DbProduct[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_new_arrival', true)
    .order('position');
  if (error || !data) return [];
  return attachVariants(data);
}

export async function getProductBySlug(slug: string): Promise<DbProduct | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(`slug.eq.${slug},aliases.cs.{${slug}}`)
    .single();
  if (error || !data) return null;
  const [full] = await attachVariants([data]);
  return full ?? null;
}

export async function getRelatedProducts(product: DbProduct, limit = 3): Promise<DbProduct[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', product.category)
    .neq('slug', product.slug)
    .order('position')
    .limit(limit);
  if (error || !data || data.length === 0) {
    // fallback: any other products
    const { data: fallback } = await supabase
      .from('products')
      .select('*')
      .neq('slug', product.slug)
      .order('position')
      .limit(limit);
    return attachVariants(fallback ?? []);
  }
  return attachVariants(data);
}

// ─────────────────────────────────────────
// AVAILABILITY SLOTS
// ─────────────────────────────────────────

export type SlotsByDate = Record<string, DbSlot[]>;

export async function getAvailableSlots(daysAhead = 30): Promise<SlotsByDate> {
  const from = new Date();
  from.setDate(from.getDate() + 1);
  const to = new Date();
  to.setDate(to.getDate() + daysAhead);

  const { data, error } = await supabase
    .from('availability_slots')
    .select('*')
    .eq('is_booked', false)
    .gte('date', from.toISOString().slice(0, 10))
    .lte('date', to.toISOString().slice(0, 10))
    .order('date')
    .order('time');

  if (error || !data) return {};

  return data.reduce<SlotsByDate>((acc, slot) => {
    if (!acc[slot.date]) acc[slot.date] = [];
    acc[slot.date].push(slot);
    return acc;
  }, {});
}

// ─────────────────────────────────────────
// RESERVATIONS
// ─────────────────────────────────────────

export interface ReservationPayload {
  slot_id: number;
  client_name: string;
  client_email: string;
  client_phone: string;
  service: ServiceType;
  location: LocationType;
  home_address?: string;
  companions?: number;
  remarks?: string;
  promo_optin?: boolean;
}

export async function createReservation(payload: ReservationPayload): Promise<{ ok: boolean; error?: string }> {
  // Mark slot as booked atomically
  const { error: slotError } = await supabase
    .from('availability_slots')
    .update({ is_booked: true })
    .eq('id', payload.slot_id)
    .eq('is_booked', false); // optimistic lock — fails silently if already booked

  if (slotError) return { ok: false, error: 'Ce créneau vient d\'être pris. Veuillez en choisir un autre.' };

  const { error } = await supabase.from('reservations').insert({
    slot_id: payload.slot_id,
    client_name: payload.client_name,
    client_email: payload.client_email,
    client_phone: payload.client_phone,
    service: payload.service,
    location: payload.location,
    home_address: payload.home_address ?? null,
    companions: payload.companions ?? 0,
    remarks: payload.remarks ?? null,
    promo_optin: payload.promo_optin ?? false,
  });

  if (error) return { ok: false, error: 'Une erreur est survenue. Réessayez.' };
  return { ok: true };
}
