export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      availability_slots: {
        Row: {
          created_at: string
          date: string
          id: number
          is_booked: boolean
          max_capacity: number
          time: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: never
          is_booked?: boolean
          max_capacity?: number
          time: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: never
          is_booked?: boolean
          max_capacity?: number
          time?: string
        }
        Relationships: []
      }
      product_images: {
        Row: {
          id: number
          position: number
          product_id: number
          url: string
        }
        Insert: {
          id?: never
          position?: number
          product_id: number
          url: string
        }
        Update: {
          id?: never
          position?: number
          product_id?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_variants: {
        Row: {
          id: number
          product_id: number
          type: Database["public"]["Enums"]["variant_type"]
          value: string
        }
        Insert: {
          id?: never
          product_id: number
          type: Database["public"]["Enums"]["variant_type"]
          value: string
        }
        Update: {
          id?: never
          product_id?: number
          type?: Database["public"]["Enums"]["variant_type"]
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          aliases: string[] | null
          category: Database["public"]["Enums"]["product_category"]
          collection: string
          created_at: string
          description: string
          fabric: string
          id: number
          is_new_arrival: boolean
          name: string
          position: number
          price: string
          short_description: string
          slug: string
          whatsapp_message: string
        }
        Insert: {
          aliases?: string[] | null
          category: Database["public"]["Enums"]["product_category"]
          collection?: string
          created_at?: string
          description?: string
          fabric?: string
          id?: never
          is_new_arrival?: boolean
          name: string
          position?: number
          price?: string
          short_description?: string
          slug: string
          whatsapp_message?: string
        }
        Update: {
          aliases?: string[] | null
          category?: Database["public"]["Enums"]["product_category"]
          collection?: string
          created_at?: string
          description?: string
          fabric?: string
          id?: never
          is_new_arrival?: boolean
          name?: string
          position?: number
          price?: string
          short_description?: string
          slug?: string
          whatsapp_message?: string
        }
        Relationships: []
      }
      reservations: {
        Row: {
          client_email: string
          client_name: string
          client_phone: string
          companions: number
          created_at: string
          home_address: string | null
          id: number
          location: Database["public"]["Enums"]["location_type"]
          promo_optin: boolean
          remarks: string | null
          service: Database["public"]["Enums"]["service_type"]
          slot_id: number | null
          status: Database["public"]["Enums"]["reservation_status"]
        }
        Insert: {
          client_email: string
          client_name: string
          client_phone: string
          companions?: number
          created_at?: string
          home_address?: string | null
          id?: never
          location?: Database["public"]["Enums"]["location_type"]
          promo_optin?: boolean
          remarks?: string | null
          service: Database["public"]["Enums"]["service_type"]
          slot_id?: number | null
          status?: Database["public"]["Enums"]["reservation_status"]
        }
        Update: {
          client_email?: string
          client_name?: string
          client_phone?: string
          companions?: number
          created_at?: string
          home_address?: string | null
          id?: never
          location?: Database["public"]["Enums"]["location_type"]
          promo_optin?: boolean
          remarks?: string | null
          service?: Database["public"]["Enums"]["service_type"]
          slot_id?: number | null
          status?: Database["public"]["Enums"]["reservation_status"]
        }
        Relationships: [
          {
            foreignKeyName: "reservations_slot_id_fkey"
            columns: ["slot_id"]
            isOneToOne: false
            referencedRelation: "availability_slots"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      location_type: "atelier" | "domicile"
      product_category:
        | "Smokings"
        | "Costumes"
        | "Vestes"
        | "Pantalons"
        | "Chemises"
        | "Accessoires"
      reservation_status: "pending" | "confirmed" | "cancelled"
      service_type:
        | "Rendez-vous découverte"
        | "Prise de mesure"
        | "Essayage après prise de mesure"
      variant_type: "color" | "size" | "customization"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">
type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<T extends keyof DefaultSchema["Tables"]> =
  DefaultSchema["Tables"][T]["Row"]

export type Enums<T extends keyof DefaultSchema["Enums"]> =
  DefaultSchema["Enums"][T]
