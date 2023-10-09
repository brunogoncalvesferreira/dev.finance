import styles from './App.module.css'
import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { CardsBalance } from './components/CardsBalance'
import { PlusCircle } from 'lucide-react'
import { Form } from './components/Form'
import { CardsTransaction } from './components/CardsTransaction'

const cardData = [
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
  const [transactions, setTransactions] = useState([])
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState(0)
  const [date, setDate] = useState('')
  const [isModal, setIsModal] = useState(false)

  function loadingGetTransaction() {
    const saved = localStorage.getItem('transactions')
    if (saved) {
      setTransactions(JSON.parse(saved))
    }
  }

  useEffect(() => {
    loadingGetTransaction()
  }, [])

  function localStorageSetTransaction(newTransaction) {
    setTransactions(newTransaction)
    localStorage.setItem('transactions', JSON.stringify(newTransaction))
  }

  function handleOpenForm() {
    setIsModal(!isModal)
  }

  const dateFormat = date.split('-')
  const newDate = `${dateFormat[2]}-${dateFormat[1]}-${dateFormat[0]}`

  function handleAddNewTransaction() {
    const newTransaction = {
      id: crypto.randomUUID(),
      desc: description,
      value: Number(amount),
      newDate,
    }
    localStorageSetTransaction([...transactions, newTransaction])

    alert('Transação salvo com sucesso.')
    setDescription('')
    setAmount(0)
    setDate('')
  }

  function handleDeleteTransaction(transactionID) {
    const actionDelete = transactions.filter((transaction) => {
      return transaction.id !== transactionID
    })

    localStorageSetTransaction(actionDelete)
  }

  const income = transactions
    .filter((item) => item.value > 0)
    .map((income) => income.value)

  const expense = transactions
    .filter((item) => item.value < 0)
    .map((expense) => expense.value)

  const sunIncome = income.reduce(
    (accumulator, incomes) => accumulator + incomes,
    0,
  )

  const sunExpense = expense.reduce(
    (accumulator, expenses) => accumulator + expenses,
    0,
  )

  const removeNegativeSign = Math.abs(sunExpense)

  const total = sunIncome - removeNegativeSign

  return (
    <div className={styles.container}>
      <Header />

      <main>
        <div className={styles.cardContainer}>
          {cardData.map((item, index) => (
            <CardsBalance
              key={index}
              title={item.title}
              income={sunIncome}
              expense={sunExpense}
              total={total}
            />
          ))}
        </div>

        <div className={styles.buttonModal}>
          <button onClick={handleOpenForm}>
            <PlusCircle />
            Nova Transação
          </button>
        </div>

        <Form
          desc={description}
          amount={amount}
          date={date}
          setDescription={setDescription}
          setAmount={setAmount}
          setDate={setDate}
          onHandleAddNewTransaction={handleAddNewTransaction}
          isModal={isModal}
          onHandleOpenForm={handleOpenForm}
          onHandleAddNewTransactions={handleAddNewTransaction}
        />

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
            {transactions.map((transaction, index) => (
              <CardsTransaction
                key={index}
                desc={transaction.desc}
                value={transaction.value}
                date={transaction.newDate}
                onHandleDeleteTransaction={handleDeleteTransaction}
                transactionsID={transaction.id}
              />
            ))}
          </tbody>
        </table>
      </main>

      <Footer />
    </div>
  )
}
