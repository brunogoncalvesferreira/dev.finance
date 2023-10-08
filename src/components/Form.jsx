import styles from './Form.module.css'

export function Form({
  openModal,
  setDescription,
  setValue,
  setDate,
  onHandleOpenModal,
  onHandleAddNewTransaction,
  description,
  value,
  date,
}) {
  function handleSubmit(event) {
    event.preventDefault()
  }

  function handleCloseModal() {
    onHandleOpenModal()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={openModal === true ? styles.active : ''}
    >
      <div className={styles.content}>
        <h2>Nova Transação</h2>
        <div className={styles.inputs}>
          <input
            onChange={(event) => setDescription(event.target.value)}
            value={description}
            type="text"
            placeholder="Descrição"
          />
          <div className={styles.values}>
            <input
              onChange={(event) => setValue(event.target.value)}
              value={value}
              type="number"
              placeholder="R$ 0,00"
              step={0.01}
            />
            <strong>
              Para despesas acrescente sinal de negativo (-), exemplo -12.88
            </strong>
          </div>
          <input
            onChange={(event) => setDate(event.target.value)}
            value={date}
            type="date"
          />
        </div>

        <div className={styles.control}>
          <button onClick={handleCloseModal} className={styles.btnCancel}>
            Cancelar
          </button>
          <button onClick={onHandleAddNewTransaction} className={styles.btnAdd}>
            Adicionar
          </button>
        </div>
      </div>
    </form>
  )
}
