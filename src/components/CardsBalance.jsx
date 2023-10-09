import styles from './CardsBalance.module.css'
import { ArrowUpCircle, ArrowDownCircle, DollarSign } from 'lucide-react'

export function CardsBalance({ title, income, expense, total }) {
  return (
    <div
      className={title === 'Total' ? `${styles.cardTotal}` : `${styles.card}`}
    >
      <div className={styles.headerCard}>
        <strong>{title}</strong>
        {title === 'Entrada' ? (
          <ArrowUpCircle color="#22c55e" />
        ) : title === 'Saída' ? (
          <ArrowDownCircle color="#dc2626" />
        ) : title === 'Total' ? (
          <DollarSign color="#fff" />
        ) : (
          ''
        )}
      </div>
      {title === 'Entrada' ? (
        <p>{income.toFixed(2).replace('.', ',')}</p>
      ) : title === 'Saída' ? (
        <p>{expense.toFixed(2).replace('.', ',')}</p>
      ) : title === 'Total' ? (
        <p>{total.toFixed(2).replace('.', ',')}</p>
      ) : (
        ''
      )}
    </div>
  )
}
