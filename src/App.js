import './App.css';
import { useEffect, useState } from 'react';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const arrayRange = (start, stop, step) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step,
  );

const DateOfBirthPopup = ({ isOpen, onClose, onUserDataSubmit }) => {
  const [year, setYear] = useState(2000);
  const [month, setMonth] = useState(1);
  const [date, setDate] = useState(1);
  const [lifeYears, setLifeYears] = useState(80);

  const handleSubmit = () => {
    onUserDataSubmit({ date, month, year, lifeYears });
    setDate(0);
    setMonth('');
    setYear(0);
    setLifeYears('');
    onClose();
  };
  var i = 1;
  return (
    <div className={`date-of-birth-popup ${isOpen ? 'open' : ''}`}>
      <div className="date-of-birth-popup-content">
        <h2>Enter Your Date and life expectancy</h2>
        <div>
          <select value={date} onChange={(e) => setDate(e.target.value)}>
            {arrayRange(1, 31, 1).map((n) => {
              return <option value={n}>{n}</option>;
            })}
          </select>
          <select
            value={month}
            onChange={(e) => {
              setMonth(e.target.value);
            }}
          >
            {months.map((n) => {
              return <option value={i++}>{n}</option>;
            })}
          </select>
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            {arrayRange(1920, new Date().getFullYear(), 1).map((n) => {
              return <option value={n}>{n}</option>;
            })}
          </select>
        </div>

        <input
          type="number"
          value={lifeYears}
          min="40"
          max="200"
          onChange={(e) => setLifeYears(e.target.value)}
        />
        <button onClick={handleSubmit} disabled={!lifeYears}>
          Submit
        </button>
      </div>
    </div>
  );
};

const CountDown = ({ date, month, year, lifeYears }) => {
  const bDay = new Date(year, month, date);
  const [time, setTime] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const res = (time - bDay.getTime()) / 31556952000;

  const rNum = 1000000000;

  return (
    <div className="full-screen-text-container">
      <table className="full-screen-text">
        <tr>
          <h1 colspan="2">You are wasting time...</h1>
        </tr>
        <tr>
          <td className="headcol">
            <b>You lived:</b> {Math.round(res * rNum) / rNum} years
          </td>
        </tr>
        <tr>
          <td className="headcol">
            <b> Years left: </b> 
            {Math.round((lifeYears - res) * rNum) / rNum} years
          </td>
        </tr>
        <tr>
          <td className="headcol">
            <b>Seconds left: </b> 
            {Math.round(
              (new Date(year + lifeYears, month, date).getTime() -
                new Date().getTime()) /
                1000,
            )}{' '}
            seconds
          </td>
        </tr>
      </table>
    </div>
  );
};

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [userData, setUserData] = useState(null);

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleUserDataSubmit = (data) => {
    setUserData(data);
  };

  return userData ? (
    <CountDown
      date={userData.date}
      month={userData.month}
      year={userData.year}
      lifeYears={userData.lifeYears}
    />
  ) : (
    <DateOfBirthPopup
      isOpen={isPopupOpen}
      onClose={closePopup}
      onUserDataSubmit={handleUserDataSubmit}
    />
  );
}

export default App;
