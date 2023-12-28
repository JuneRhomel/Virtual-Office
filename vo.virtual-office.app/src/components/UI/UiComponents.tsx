export function Input({
    id,
    placeholder = "text",
    required,
    type = "text",
    value,
    name,
    label,
  }: {
    id?: string;
    placeholder?: string;
    required?: boolean;
    type?: string;
    value?: string;
    name?: string;
    label?: string;
  }) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
    }
    return (
      <div className="mb-1">
        <div className="input-box">
          <input
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            required={required}
            value={value} // Either use defaultValue or value with onChange
            onChange={handleChange}
            // defaultValue={value} // Uncomment this line if the field is meant to be read-only
          />
          <label htmlFor={id}>{label}</label>
        </div>
      </div>
    );
  }
  
export  function Button({
    className = "",
    id = "",
    children,
    type
}: {
    className?: string,
    id?: string,
    children?: React.ReactNode,
    type?: "button" | "reset" | "submit" | undefined
}):
    React.ReactElement {
    return (
        <button id={id} className={className + " btn"} type={type} >{children}</button>
    );
}

export function Container({ children }: any) {
  const style = { width: "75%", marginLeft: "auto", marginRight: "auto", marginTop: "20px", height: "100%" }; 
  return (
    <div style={style}>
      {children}
    </div>
  );
}
