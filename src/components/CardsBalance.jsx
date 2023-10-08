import styles from './CardsBalance.module.css'
import { ArrowUpCircle, ArrowDownCircle, DollarSign } from 'lucide-react'

export function CardsBalance({ title, sunIncome, sunExpense, total }) {
  return (
    <div className={styles.card}>
      <div className={styles.headerCard}>
        <strong>{title}</strong>
        {title === 'Entrada' ? (
          <ArrowUpCircle color="#22c55e" />
        ) : title === 'Saída' ? (
          <ArrowDownCircle color="#dc2626" />
        ) : (
          <DollarSign color="#0f172a" />
        )}
      </div>
      {title === 'Entrada' ? (
        <p>R$ {sunIncome.toFixed(2).replace('.', ',')}</p>
      ) : title === 'Saída' ? (
        <p>R$ {sunExpense.toFixed(2).replace('.', ',')}</p>
      ) : (
        <p>R$ {total.toFixed(2).replace('.', ',')}</p>
      )}
    </div>
  )
}
