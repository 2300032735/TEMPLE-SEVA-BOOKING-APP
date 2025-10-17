import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import config from './config.js';

// ====== NEW: Map Seva Type to Amount ======
const SEVA_AMOUNTS = {
  "Archana": 1000,
  "Abhishekam": 1500,
  "Harathi": 500,
  "Special Seva": 3000,
  "Thomala Seva": 5000,
  "Kalyanotsavam": 20000,
  "Sahasra Deepalankara Seva": 15000,
  "Vasanthotsavam": 10000,
  "Arjitha Sevas": 5000
};

// ====== NEW: List of Available Temples ======
const TEMPLES = [
  "Tirumala Venkateswara Temple",
  "Annavaram Temple",
  "Srisailam Temple",
  "Kanaka Durga Temple",
  "Simhachalam Temple"
];

// ====== NEW: List of Time Slots ======
const TIME_SLOTS = [
  "06:00 AM - 07:00 AM",
  "07:00 AM - 08:00 AM",
  "08:00 AM - 09:00 AM",
  "09:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM"
];

const SevaManager = () => {
  const [sevas, setSevas] = useState([]);
  const [seva, setSeva] = useState({
    id: '',
    devoteeName: '',
    templeName: '',
    sevaType: '',
    bookingDate: '',
    timeSlot: '',
    contactNumber: '',
    email: '',
    amount: ''
  });
  const [idToFetch, setIdToFetch] = useState('');
  const [fetchedSeva, setFetchedSeva] = useState(null);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  const baseUrl = `${config.url}/sevaapi`;

  useEffect(() => {
    fetchAllSevas();
  }, []);

  const fetchAllSevas = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setSevas(res.data);
    } catch {
      setMessage('⚠️ Failed to fetch Sevas.');
    }
  };

  // ====== MODIFIED: handleChange to auto-set amount ======
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "sevaType") {
      setSeva({
        ...seva,
        sevaType: value,
        amount: SEVA_AMOUNTS[value] || '' // auto-set amount
      });
    } else {
      setSeva({ ...seva, [name]: value });
    }
  };

  const validateForm = () => {
    for (let key in seva) {
      if (!seva[key] || seva[key].toString().trim() === '') {
        setMessage(`⚠️ Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const addSeva = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, seva);
      setMessage('✅ Seva added successfully.');
      fetchAllSevas();
      resetForm();
    } catch {
      setMessage('❌ Error adding Seva.');
    }
  };

  const updateSeva = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update`, seva);
      setMessage('✅ Seva updated successfully.');
      fetchAllSevas();
      resetForm();
    } catch {
      setMessage('❌ Error updating Seva.');
    }
  };

  const deleteSeva = async (id) => {
    try {
      await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage('✅ Seva deleted successfully.');
      fetchAllSevas();
    } catch {
      setMessage('❌ Error deleting Seva.');
    }
  };

  const getSevaById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      setFetchedSeva(res.data);
      setMessage('');
    } catch {
      setFetchedSeva(null);
      setMessage('⚠️ Seva not found.');
    }
  };

  const handleEdit = (s) => {
    setSeva(s);
    setEditMode(true);
    setMessage(`Editing Seva with ID ${s.id}`);
  };

  const resetForm = () => {
    setSeva({
      id: '',
      devoteeName: '',
      templeName: '',
      sevaType: '',
      bookingDate: '',
      timeSlot: '',
      contactNumber: '',
      email: '',
      amount: ''
    });
    setEditMode(false);
  };

  return (
    <div className="seva-container">

      {message && (
        <div className={`message-banner ${message.toLowerCase().includes('error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <h2>🪔 Seva Booking Management</h2>

      {/* ===== Add / Edit Form ===== */}
      <div>
        <h3>{editMode ? 'Edit Seva' : 'Add Seva'}</h3>
        <div className="form-grid">
          <input type="number" name="id" placeholder="ID" value={seva.id} onChange={handleChange} />
          <input type="text" name="devoteeName" placeholder="Devotee Name" value={seva.devoteeName} onChange={handleChange} />

          {/* ===== Temple Name Dropdown (NEW) ===== */}
          <select name="templeName" value={seva.templeName} onChange={handleChange}>
            <option value="">Select Temple</option>
            {TEMPLES.map((temple, index) => (
              <option key={index} value={temple}>{temple}</option>
            ))}
          </select>

          {/* ===== Seva Type Dropdown (MODIFIED) ===== */}
          <select name="sevaType" value={seva.sevaType} onChange={handleChange}>
            <option value="">Select Seva Type</option>
            <option value="Archana">Archana</option>
            <option value="Abhishekam">Abhishekam</option>
            <option value="Harathi">Harathi</option>
            <option value="Special Seva">Special Seva</option>
            <option value="Thomala Seva">Thomala Seva</option>
            <option value="Kalyanotsavam">Kalyanotsavam</option>
            <option value="Sahasra Deepalankara Seva">Sahasra Deepalankara Seva</option>
            <option value="Vasanthotsavam">Vasanthotsavam</option>
            <option value="Arjitha Sevas">Arjitha Sevas</option>
          </select>

          <input type="date" name="bookingDate" value={seva.bookingDate} onChange={handleChange} />

          {/* ===== Time Slot Dropdown (NEW) ===== */}
          <select name="timeSlot" value={seva.timeSlot} onChange={handleChange}>
            <option value="">Select Time Slot</option>
            {TIME_SLOTS.map((slot, index) => (
              <option key={index} value={slot}>{slot}</option>
            ))}
          </select>

          {/* ===== Amount Read-Only (MODIFIED) ===== */}
          <input type="number" name="amount" placeholder="Amount" value={seva.amount} readOnly />

          <input type="text" name="contactNumber" placeholder="Contact Number" value={seva.contactNumber} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={seva.email} onChange={handleChange} />
        </div>

        <div className="btn-group">
          {!editMode ? (
            <button className="btn-blue" onClick={addSeva}>Add Seva</button>
          ) : (
            <>
              <button className="btn-green" onClick={updateSeva}>Update Seva</button>
              <button className="btn-gray" onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      {/* ===== Fetch By ID ===== */}
      <div>
        <h3>🔍 Get Seva By ID</h3>
        <input
          type="number"
          value={idToFetch}
          onChange={(e) => setIdToFetch(e.target.value)}
          placeholder="Enter Seva ID"
        />
        <button className="btn-blue" onClick={getSevaById}>Fetch</button>

        {fetchedSeva && (
          <div>
            <h4>Seva Found:</h4>
            <pre>{JSON.stringify(fetchedSeva, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* ===== All Sevas Table ===== */}
      <div>
        <h3>📜 All Sevas</h3>
        {sevas.length === 0 ? (
          <p>No Sevas found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {Object.keys(seva).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sevas.map((s) => (
                  <tr key={s.id}>
                    {Object.keys(seva).map((key) => (
                      <td key={key}>{s[key]}</td>
                    ))}
                    <td>
                      <div className="action-buttons">
                        <button className="btn-green" onClick={() => handleEdit(s)}>Edit</button>
                        <button className="btn-red" onClick={() => deleteSeva(s.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default SevaManager;
