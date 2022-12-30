import { MdOutlineImage } from "react-icons/md";
import { ChangeEvent, useRef, useState, useEffect } from "react";

type Props = {
  preview?: string;
  onPick?: (file: File) => void;
};

const PhotoPicker: React.FC<Props> = ({ preview, onPick }) => {
  // useRef digunakan untuk mendapatkan referensi dari DOM / document object model
  const refInput = useRef<HTMLInputElement>(null);
  const [src, setSrc] = useState("");


  // function dibawah digunakan untuk membaca apakah ada file dari file reader jika ada, maka ditampilkan di element
  const pick = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      setSrc(e.target?.result as string);
      
      if (event.target.files?.[0]) {
        onPick?.(event.target.files[0])
      }
    };

    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  useEffect(() => {
    // setiap kali component thumbnail picker ini memiliki preview maka preview akan diset ke setSrc
    if(preview){
      setSrc(preview)
    }
  }, [preview])

  return (
    <div
      className="w-40 h-40 aspect-video bg-slate-200 flex rounded-full justify-center items-center cursor-pointer "
      onClick={() => {
        refInput.current?.click();
      }}
    >
      {" "}
      {!!src && (
        <img src={src} alt="Preview" className="w-full h-full rounded-full object-cover" />
      )}
      {!src && ( <MdOutlineImage className="text-7xl text-slate-400" />
        
        
      )}
      <input
        type="file"
        accept="image/png, image/jpeg, "
        className="hidden"
        ref={refInput}
        onChange={pick}
      />
    </div>
  );
};
export default PhotoPicker;
