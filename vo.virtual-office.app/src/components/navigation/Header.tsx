import style from "./Navigation.module.css"
export default function Header({ children }: any) {
  return (
    <div>
      <header className={style.header}>
        <div className={style.headerContainer}>
          <div className={style.logo}>
            <img src="/logo.png" alt="" />
          </div>
          <div>
            {/* Add More */}
          </div>
        </div>
      </header>
      {children}
    </div>

  )
}
