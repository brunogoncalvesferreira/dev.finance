import styles from './Empty.module.css'

export function Empty() {
  return (
    <div className={styles.container}>
      <h2>Você ainda não possui nenhuma transação</h2>
    </div>
  )
}
