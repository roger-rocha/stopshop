import {
  Accessibility,
  Armchair,
  Baby,
  Banknote,
  BatteryCharging,
  Bus,
  Car,
  ConciergeBell,
  CreditCard,
  Dog,
  Gift,
  Info,
  Landmark,
  LifeBuoy,
  Luggage,
  MapPinned,
  Package,
  ParkingSquare,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  Toilet,
  Truck,
  UtensilsCrossed,
  Wifi,
  type LucideIcon,
} from "lucide-react";

/**
 * Ícones disponíveis para os serviços. O admin grava só a chave, então a lista
 * é fechada de propósito: evita string arbitrária virando import dinâmico e
 * mantém o vocabulário visual da página consistente.
 */
export const serviceIcons: Record<string, { label: string; icon: LucideIcon }> = {
  concierge: { label: "Concierge / atendimento", icon: ConciergeBell },
  estacionamento: { label: "Estacionamento", icon: ParkingSquare },
  valet: { label: "Valet / carro", icon: Car },
  acessibilidade: { label: "Acessibilidade", icon: Accessibility },
  alimentacao: { label: "Alimentação", icon: UtensilsCrossed },
  wifi: { label: "Wi-Fi", icon: Wifi },
  caixa: { label: "Caixa eletrônico", icon: Banknote },
  cartao: { label: "Cartão / pagamento", icon: CreditCard },
  fraldario: { label: "Fraldário / família", icon: Baby },
  banheiro: { label: "Banheiros", icon: Toilet },
  ambulatorio: { label: "Ambulatório", icon: Stethoscope },
  seguranca: { label: "Segurança", icon: ShieldCheck },
  achados: { label: "Achados e perdidos", icon: Package },
  guardaVolumes: { label: "Guarda-volumes", icon: Luggage },
  excursoes: { label: "Excursões e grupos", icon: Bus },
  entrega: { label: "Entrega / carga", icon: Truck },
  carregador: { label: "Carregador", icon: BatteryCharging },
  lounge: { label: "Lounge / descanso", icon: Armchair },
  pet: { label: "Pet friendly", icon: Dog },
  presente: { label: "Vale-presente", icon: Gift },
  informacoes: { label: "Informações", icon: Info },
  banco: { label: "Banco / lotérica", icon: Landmark },
  compras: { label: "Compras", icon: ShoppingBag },
  localizacao: { label: "Localização", icon: MapPinned },
  apoio: { label: "Apoio ao cliente", icon: LifeBuoy },
  destaque: { label: "Destaque / outro", icon: Sparkles },
};

export const serviceIconKeys = Object.keys(serviceIcons);

export const defaultServiceIcon = "destaque";

export function serviceIcon(key: string): LucideIcon {
  return (serviceIcons[key] ?? serviceIcons[defaultServiceIcon]).icon;
}
