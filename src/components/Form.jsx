import styles from './Form.module.css'

export function Form({
  desc,
  amount,
  date,
  setDescription,
  setAmount,
  setDate,
  isModal,
  onHandleOpenForm,
  onHandleAddNewTransactions,
}) {
  function handleSubmit(event) {
    event.preventDefault()
  }
  return (
    <form onSubmit={handleSubmit} className={isModal ? `${styles.active}` : ''}>
      <div className={styles.content}>
        <h2>Nova Transação</h2>
        <div className={styles.inputs}>
          <input
            onChange={(e) => setDescription(e.target.value)}
            value={desc}
            type="text"
            placeholder="Descrição"
          />
          <div className={styles.values}>
            <input
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              type="number"
              placeholder="R$ 0,00"
              step={0.01}
            />
            <strong>
              Para despesas acrescente sinal de negativo (-), exemplo -12.88
            </strong>
          </div>
          <input
            onChange={(e) => setDate(e.target.value)}
            value={date}
            type="date"
          />
        </div>

        <div className={styles.control}>
          <button onClick={onHandleOpenForm} className={styles.btnCancel}>
            Cancelar
          </button>
          <button
            onClick={onHandleAddNewTransactions}
            className={styles.btnAdd}
          >
            Adicionar
          </button>
        </div>
      </div>
    </form>
  )
}
