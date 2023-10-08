import styles from './App.module.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { CardsBalance } from './components/CardsBalance'
import { PlusCircle } from 'lucide-react'
import { Form } from './components/Form'
import { useEffect, useState } from 'react'
import { CardsTransaction } from './components/CardsTransaction'
import { Empty } from './components/Empty'

const data = [
  {
    title: 'Entrada',
  },
  {
    title: 'Saída',
  },
  {
    title: 'Total',
  },
]

export function App() {
  const [description, setDescription] = useState('')
  const [value, setValue] = useState(0)
  const [date, setDate] = useState('')
  const [isModel, setIsModel] = useState(false)
  const [income, setIncome] = useState([])
  const [expense, setExpense] = useState([])
  const [transaction, setTransaction] = useState([])
  // const [total, setTotal] = useState(0)

  useEffect(() => {
    const combinedTransaction = [...income, ...expense]
    setTransaction(combinedTransaction)
  }, [income, expense])

  function handleOpenModal() {
    setIsModel(!isModel)
  }

  const dateFormat = date.split('-')
  const newDate = `${dateFormat[2]}/${dateFormat[1]}/${dateFormat[0]}`

  function handleAddNewTransaction() {
    const newTransaction = {
      id: crypto.randomUUID(),
      description,
      value: Number(value),
      newDate,
    }
    if (value > 0) {
      setIncome((statePrevent) => [...statePrevent, newTransaction])
    } else {
      setExpense((statePrevent) => [...statePrevent, newTransaction])
    }
    alert('Transação Salva com sucesso!')
    setDescription('')
    setValue('')
    setDate('')
  }

  function handleDeleteTransaction(transactionID) {
    const actionDeleteTransaction = transaction.filter((transaction) => {
      return transaction.id !== transactionID
    })

    if (value > 0) {
      setIncome(actionDeleteTransaction.filter((income) => income.value > 0))
      setExpense(
        actionDeleteTransaction.filter((expense) => expense.value <= 0),
      )
    } else {
      setIncome(actionDeleteTransaction.filter((income) => income.value > 0))
      setExpense(
        actionDeleteTransaction.filter((expense) => expense.value <= 0),
      )
    }
    alert('Transação deletada com sucesso!')
  }

  const sunIncome = income.reduce(
    (accumulator, incomes) => accumulator + incomes.value,
    0,
  )

  const sunExpense = expense.reduce(
    (accumulator, expense) => accumulator + expense.value,
    0,
  )

  const convertedSunExpense = Math.abs(sunExpense)
  const total = sunIncome - convertedSunExpense

  return (
    <div className={styles.container}>
      <Header />

      <main>
        <div className={styles.cardContainer}>
          {data.map((item, index) => (
            <CardsBalance
              key={index}
              title={item.title}
              sunIncome={sunIncome}
              sunExpense={sunExpense}
              total={total}
            />
          ))}
        </div>

        <div className={styles.buttonModal}>
          <button onClick={handleOpenModal}>
            <PlusCircle />
            Nova Transação
          </button>
        </div>

        <Form
          openModal={isModel}
          setDescription={setDescription}
          setValue={setValue}
          setDate={setDate}
          description={description}
          value={value}
          date={date}
          onHandleOpenModal={handleOpenModal}
          onHandleAddNewTransaction={handleAddNewTransaction}
        />

        {transaction.length === 0 ? (
          <Empty />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Data</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {transaction.map((item) => (
                <CardsTransaction
                  key={item.id}
                  description={item.description}
                  value={item.value}
                  date={item.newDate}
                  onHandleDeleteTransaction={handleDeleteTransaction}
                  transactionID={item.id}
                />
              ))}
            </tbody>
          </table>
        )}
      </main>

      <Footer />
    </div>
  )
}
