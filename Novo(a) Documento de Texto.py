import fitz  # pymupdf
import os

def extrair_imagens(pdf_path, pasta_saida):
    # Abre o PDF
    doc = fitz.open(pdf_path)

    # Garante que a pasta de saída existe
    os.makedirs(pasta_saida, exist_ok=True)

    contador = 0

    # Itera pelas páginas
    for pagina_num, pagina in enumerate(doc):
        imagens = pagina.get_images(full=True)
        for img_index, img in enumerate(imagens):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            nome_arquivo = f"pagina{pagina_num + 1}_img{img_index + 1}.{image_ext}"

            with open(os.path.join(pasta_saida, nome_arquivo), "wb") as f:
                f.write(image_bytes)
            
            contador += 1

    print(f"{contador} imagem(ns) extraída(s) para: {pasta_saida}")

# Exemplo de uso
extrair_imagens("C:/Users/LAB-48/Desktop/Nova pasta/img/san_paolo/SAN PAOLO -20250924T181323Z-1-001/SAN PAOLO/Garden SP final 1 .pdf", "C:/Users/LAB-48/Desktop/Nova pasta/img/san_paolo/SAN PAOLO -20250924T181323Z-1-001/SAN PAOLO")