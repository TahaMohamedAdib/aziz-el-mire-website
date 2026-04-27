import { redirect } from 'next/navigation';

export default function CostumesPage() {
  redirect('/collections?category=Costumes');
}
