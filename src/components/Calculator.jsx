import React, { useState } from 'react'
import Slider from '@mui/material/Slider';
import { AmountMarks, InterestMarks, DurationMarks } from './Marks';
import Chart from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

const Calculator = () => {
    const [amount, setAmount] = useState(5000000)
    const [interest, setInterest] = useState(9)
    const [duration, setDuration] = useState(240)
    const maxAmount = 20000000;
    const maxInterest = 20;
    const maxDuration = 360;
    const interestLogic = interest / 12 / 100;
    const options = { maximumFractionDigits: 2 }

    const formattedAmount = Intl.NumberFormat("en-US", options).format(amount);

    const emi = amount * interestLogic * (Math.pow(1 + interestLogic, duration)) / (Math.pow(1 + interestLogic, duration) - 1)
    const formattedEmi = Intl.NumberFormat("en-US", options).format(emi);

    const totalPayable = emi * duration;
    const formattedTotalPayable = Intl.NumberFormat("en-US", options).format(totalPayable);

    const interestPayable = totalPayable - amount;
    const formattedInterestPayable = Intl.NumberFormat("en-US", options).format(interestPayable);

    const amountChange = event => {
        setAmount(event.target.value);
    };
    const interestChange = event => {
        setInterest(event.target.value);
    };
    const durationChange = event => {
        setDuration(event.target.value);
    };
    const interestPercentage = (interestPayable / totalPayable) * 100;

    const totalPercentage = (amount / totalPayable) * 100;

    return (
      <div className='calculator'>
          {/* Selection bar and input */}
          <div className="selection-container">
          <div className="selection">
              <div className="input-container">
                      <p>Loan Amount</p>
                      <div className="input">
                            <input onChange={amountChange} value={amount} type="text" />
                          <div className="symbol">₹</div>
                      </div>
              </div>
                  <div className="slider">
                      <Slider
                            defaultValue={5000000}
                            onChange={amountChange}
                            value={amount}
                          valueLabelDisplay="auto"
                          step={100000}
                          marks={AmountMarks}
                          min={0}
                          max={maxAmount}
                      />
                  </div>
          </div>
          <div className="selection">
              <div className="input-container">
                  <p>Interest Rate</p>
                      <div className="input">
                            <input onChange={interestChange} value={interest} type="text" />
                          <div className="symbol">%</div>
                      </div>
              </div>
                  <div className="slider">
                      <Slider
                            defaultValue={9}
                            onChange={interestChange}
                            value={interest}
                          valueLabelDisplay="auto"
                          step={.25}
                          marks={InterestMarks}
                          min={5}
                          max={maxInterest}
                      />
                  </div>
          </div>
          <div className="selection">
              <div className="input-container">
                  <p>Loan Tenure</p>
                      <div className="input">
                            <input onChange={durationChange} value={duration} type="text" />
                          <div className="symbol">Mo</div>
                      </div>
              </div>
                  <div className="slider">
                      <Slider
                          defaultValue={240}
                            onChange={durationChange}
                            value={duration}
                          valueLabelDisplay="auto"
                          step={6}
                          marks={DurationMarks}
                          min={0}
                          max={maxDuration}
                      />
                  </div>
              </div>
          </div>
          
          {/* Data container */}
          <div className="data-container">
              <div className="text-data-container">
                  <div className="text-data">
                      <p>Loan EMI</p>
                        <p className='money-amount'>₹ {formattedEmi}</p>
                  </div>
                  <div className="text-data">
                      <p>Intrest Payable</p>
                        <p className='money-amount'>₹ {formattedInterestPayable}</p>
                  </div>
                  <div className="text-data">
                      <p>Total Payment</p>
                        <p className='money-amount'>₹ {formattedTotalPayable}</p>
                  </div>
              </div>

              <div className="pie-container">
                  <p className='heading'>Break-up of Total Payment</p>
                    <div className='pie-chart'>
                        <Pie 
                            data={{
                                datasets: [{
                                    data: [totalPercentage, interestPercentage],
                                    backgroundColor: ['green', 'orange'],
                                },
                                ]
                            }}
                            width={200}
                            height={200}
                        />
                        {/* Principal Loan Amount
                        Total Interest */}
                  </div>
                  <div className="chart-info">
                      <div className="green-container">
                          <div className="green-circle"></div>
                          <p>Principal Loan Amount</p>
                      </div>
                      <div className="orange-container">
                          <div className="orange-circle"></div>
                            <p>Total Intrest</p>
                      </div>
                  </div>
              </div>
          </div>

    </div>
  )
}

export default Calculator