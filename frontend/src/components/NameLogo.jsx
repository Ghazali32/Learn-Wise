
export function NameLogo({ name }) {
  return (
    <button className="flex items-center justify-center bg-[#2d2f31] w-9 h-9 rounded-full">
          <h1 className="text-white text-md font-semibold">
            {name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase()}
          </h1>
        </button>
  );
}
