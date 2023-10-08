import styles from './CardsTransaction.module.css'
import { Trash2 } from 'lucide-react'

export function CardsTransaction({
  description,
  value,
  date,
  onHandleDeleteTransaction,
  transactionID,
}) {
  function handleDelete() {
    onHandleDeleteTransaction(transactionID)
  }

  return (
    <tr>
      <td className={styles.description}>{description}</td>
      <td className={value > 0 ? `${styles.positive}` : `${styles.negative}`}>
        R$ {value.toFixed(2).replace('.', ',')}
      </td>
      <td className={styles.date}>{date}</td>
      <td>
        <button onClick={handleDelete}>
          <Trash2 />
        </button>
      </td>
    </tr>
  )
}
