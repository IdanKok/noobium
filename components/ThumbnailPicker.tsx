import { MdOutlineImage } from "react-icons/md";
import { ChangeEvent, useRef, useState, useEffect } from "react";

type Props = {
  preview?: string;
  onPick?: (file: File) => void;
};

const ThumbnailPicker: React.FC<Props> = ({ preview, onPick }) => {
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
      className="w-full aspect-video bg-slate-200 flex flex-col justify-center items-center cursor-pointer "
      onClick={() => {
        refInput.current?.click();
      }}
    >
      {" "}
      {!!src && (
        <img src={src} alt="Preview" className="w-full h-full object-cover" />
      )}
      {!src && (
        <>
          <MdOutlineImage className="w-32 h-32 text-9xl text-slate-400 object-center mb-10" />
          <p className="font-sans text-slate-400 font-normal text-base text-center">
            Upload a Thumbnail
          </p>
        </>
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
export default ThumbnailPicker;
