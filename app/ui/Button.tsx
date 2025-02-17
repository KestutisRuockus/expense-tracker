type ButtonProps = {
  text: string;
  fn: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

const Button = ({ text, fn, disabled }: ButtonProps) => {
  return (
    <button
      onClick={fn}
      className={`w-fit text-center border-2 border-borderColor px-6 py-1 rounded-xl bg-borderColor text-sm text-titleText font-600
       cursor-pointer ${
         disabled
           ? "cursor-default opacity-50"
           : "hover:scale-[1.15] hover:bg-backgroundSecondary hover:text-borderColor hover:border-backgroundSecondary"
       } transition-all duration-300`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
