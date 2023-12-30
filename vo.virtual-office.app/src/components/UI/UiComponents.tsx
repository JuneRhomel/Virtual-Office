export function Input({
  id,
  placeholder = "text",
  required,
  type = "text",
  classNames,
  value,
  name,
  label,
  onChange
}: {
  id?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  classNames?: string[];
  value?: string;
  name?: string;
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
  }
  const className = classNames ? classNames.join(" ") : "";
  return (
    <div className={`mb-1 ${className}`}>
      <div className="input-box">
        <input
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          required={required}
          value={value} // Either use defaultValue or value with OnChange
          onChange={onChange? onChange : handleChange}
        // defaultValue={value} // Uncomment this line if the field is meant to be read-only
        />
        <label htmlFor={id}>{label}</label>
      </div>
    </div>
  );
}

export function Button({
  className = "",
  id = "",
  children,
  type,
  onClick
}: {
  className?: string,
  id?: string,
  children?: React.ReactNode,
  type?: "button" | "reset" | "submit" | undefined,
  onClick?: () => void
}):
  React.ReactElement {
  return (
    <button id={id} className={className + " btn"} type={type} onClick={onClick} >{children}</button>
  );
}

export function Container({ children }: any) {
  const style = { width: "80%", marginLeft: "auto", marginRight: "auto", marginTop: "20px", height: "100%" };
  return (
    <div style={style}>
      {children}
    </div>
  );
}

export function Title({ children }: any) {
  const style = { fontSize: "2em", fontWeight: "bold" };
  return (
    <h1 style={style}>{children}</h1>
  );
}