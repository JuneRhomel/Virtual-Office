import { BottonModel } from "../../model/model";
import { Button, Container, Title } from "../UI/UiComponents";
import style from "./PageLayout.module.css"


export default function PageLayout({ title, btn, children }: { title: string, btn: BottonModel[], children: React.ReactNode }) {
  return (
    <Container>
      <div className={style.header}>
        <Title>{title}</Title>
        <div className={style.groupBtn}>
          {btn.map((btn) => <Button className={style.btn} key={btn.label} onClick={btn.onClick} >{btn.label}</Button>)}
        </div>
      </div>
      <div>
        {children}
      </div>
    </Container>
  )
}
