import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-blue-500 py-4 sm:py-6">
      <div className="w-full mx-auto flex items-center justify-between h-[100px]">
        <div className="text-white px-8"> 
          <h1 className="font-manrope font-bold text-[40px] leading-none">Patient Directory</h1>
          <p className="font-manrope font-normal text-[20px] leading-none">1000 Patient Found</p>
        </div>
        <div className="flex items-center">
          <img 
            src="/headerImage.svg" 
            alt="Header Image" 
            className="h-[148px] w-auto object-contain"
          />
        </div>
      </div>
    </header>
  );
}
