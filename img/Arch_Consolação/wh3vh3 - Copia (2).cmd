for %%i in (*.jpeg) do ffmpeg -i "%%i" -vf "scale=iw/1:ih/1" "%%~ni.webp"
