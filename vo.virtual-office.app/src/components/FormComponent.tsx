export default function FormComponent( { action, method, children, className, id }: { action?: string, method?: string, children?: React.ReactNode, className?: string, id?: string }): React.ReactElement {
    console.log("FormComponent", action, method, children, className, id);
    return (
      <form id={id} action={action} method={method} className={className}>
        {children}
      </form>
    );
  }