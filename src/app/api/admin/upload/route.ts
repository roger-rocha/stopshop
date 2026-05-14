import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

const ALLOWED_CONTENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
];

const MAX_SIZE_BYTES = 8 * 1024 * 1024; // 8 MB

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        // Esta rota não está sob o layout protegido de /admin, então a checagem
        // de sessão precisa acontecer aqui — é o que impede uploads anônimos.
        const session = await getSession();
        if (!session) {
          throw new Error("Não autorizado.");
        }
        return {
          allowedContentTypes: ALLOWED_CONTENT_TYPES,
          addRandomSuffix: true,
          maximumSizeInBytes: MAX_SIZE_BYTES,
        };
      },
      // Só dispara em produção, via webhook da Vercel. Não dependemos disso:
      // a URL do blob volta direto na resposta do upload no cliente.
      onUploadCompleted: async () => {},
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro no upload." },
      { status: 400 }
    );
  }
}
