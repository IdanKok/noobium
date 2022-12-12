import classNames from "classnames";

type Props = JSX.IntrinsicElements["button"] & {
  size?: "normal" | "large";
  isFullWidth?: boolean;
  // tandanya tanya pada size? artinya adalah opsional boleh pake atau tidak jika tidak menggunka tandatanya maka dia wajib
};

const Button: React.FC<Props> = ({
  size = "normal",
  isFullWidth = false,
  ...rest
}) => {
  return (
    <button
      className={classNames(
        "bg-blue-800 rounded-full px-4  text-sm font-sans text-white",
        {
          "h-6": size ==='normal',
          "h-10": size === 'large',
          "w-full": isFullWidth
        }
      )}
      {...rest}
    />
  );
};
export default Button;
