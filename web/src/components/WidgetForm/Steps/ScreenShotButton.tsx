import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../../Loading";

interface ScreenShotButtonProps {
    screenshot: string;
    onScreenshotTook: (screenshot:string | null) => void
}


export function ScreenShotButton({
    screenshot, 
    onScreenshotTook
} : ScreenShotButtonProps) {
    
    const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

   async function handleTakeSreenshot(){
       setIsTakingScreenshot(true);
       
        const canvas = await html2canvas(document.querySelector('html')!);
        const base64Image = canvas.toDataURL('image/png');

        onScreenshotTook(base64Image);
        setIsTakingScreenshot(false);
    }

    if (screenshot){
        return (
            <button 
            type="button"
            className="p-1 w-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
            onClick={() => onScreenshotTook(null)}
            style={{
                backgroundImage: `url(${screenshot})`,
                backgroundPosition: 'right bottom',
                backgroundSize:180,
            }}
            >
            <Trash weight="fill" />
            </button>
        )
    }

    return (
        <button
            type="button"
            onClick={handleTakeSreenshot}
            className="p-2 bg-zinc-800 rounded-md border-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-violet-500"
          >
            {isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6 text-zinc-100" />}
          </button>

    )
}