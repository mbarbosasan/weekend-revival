export const IconWrapper = ({label, children}: {label: string, children: React.ReactNode}) => {
  return (
      <>
          <div className="flex flex-col flex-nowrap justify-between items-center w-[60px] sm:w-[80px]">
              <p className="text-[11px] sm:text-sm text-gray-400">{label}</p>
              {children}
          </div>
      </>
  );
};