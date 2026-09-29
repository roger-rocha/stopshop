import { permanentRedirect } from "next/navigation";

export default function LegacyWholesalePage() {
  permanentRedirect("/lojas");
}
