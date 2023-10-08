import styles from './Header.module.css'
import { CircleDollarSign } from 'lucide-react'

export function Header() {
  return (
    <header className={styles.header}>
      <h1>Dev.Finance</h1>
      <CircleDollarSign size={40} />
    </header>
  )
}
