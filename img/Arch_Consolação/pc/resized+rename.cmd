@echo off
setlocal enabledelayedexpansion

set count=19

for %%f in (*.jpeg) do (
    rem gera o número com dois dígitos
    set "num=00!count!"
    set "num=!num:~-2!"
    
    rem processa a imagem reduzindo pela metade e convertendo para WebP
    ffmpeg -i "%%f" -vf "scale=iw/1:ih/1" "pic!num!.webp"
    
    set /a count+=1
)

echo Processamento concluído!
pause
