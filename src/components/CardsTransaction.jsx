import styles from './CardsTransaction.module.css'
import { Trash2 } from 'lucide-react'

export function CardsTransaction({
  desc,
  value,
  date,
  onHandleDeleteTransaction,
  transactionsID,
}) {
  function handleDelete() {
    onHandleDeleteTransaction(transactionsID)
  }

  return (
    <tr>
      <td className={styles.description}>{desc}</td>
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
