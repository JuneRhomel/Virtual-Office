interface FormComponentProps {
  action?: string;
  method?: string;
  children?: React.ReactNode;
  className?: string;
  id?: string;
  eventListener?: React.FormEventHandler<HTMLFormElement>;
}

export default function FormComponent({
  action,
  method,
  children,
  className,
  id,
  eventListener,
}: FormComponentProps): React.ReactElement {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents the default form submission behavior
    if (eventListener) {
      eventListener(event);
    }
  };

  return (
    <form id={id} onSubmit={handleSubmit} action={action} method={method} className={className}>
      {children}
    </form>
  );
}
