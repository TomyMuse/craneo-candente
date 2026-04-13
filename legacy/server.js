const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// --- Auth Middleware ---
// Simple in-memory token store for this example (could be Redis or DB in production)
const sessions = {};

const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (sessions[token]) {
            req.user = sessions[token];
            return next();
        }
    }
    res.status(401).json({ error: 'No autorizado' });
};

// --- Config Data ---
const ROOMS = [
    {
        id: 1,
        name: 'SALA 1',
        description: 'THE BEAST',
        details: ['Marshall DSL100H', 'Ampeg SVT-CL', 'Pearl Masters'],
        price: 15000,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwACDngs9fSMjn2zOmOxYjVzq4Ed1k_eNlT_EejtQe_V3RuK4z6pga2S1n1nzEkBBM7N71Ol-FhdybWDWIjzZ5Fp3k2e55lSRMPKyOnY0v1gB0RWiVjPf3Dg6YBUvm20df6d3r-YZp0fyAJXzOdhqcGGmRLYnVUsyeMWdOvymIis8olbyXI1nuWzP4m1tRWJBOUMjg1_y3Nsz_LxotRs0Il-eI6WmSFbm9I4g--J8hJsQ4LLgyjWq2DxKyiXy1GNXvHfcv-Ryxe9Y'
    },
    {
        id: 2,
        name: 'SALA 2',
        description: 'VINTAGE',
        details: ['Vox AC30 C2', 'Fender Bassman', 'Gretsch Renown'],
        price: 12000,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAW45R0zD8rXL3PnhtwEcvGN2NUclNT1mwLn571Uy2gaIyfZqADrQ8Oo4srCRtOL1Msx0nRJfymWPJAbTF1Lp_nVfN-IMGeg0LX29vh1TLSvIx1lXa6rz0Mojl_rjOKvfsAysPpkg2cgNFCIacw_TfZdXcUF9bunU5XDdZP3MPmc39EPCJ9Acbcff5_mIpZ6UU4heoMoqYQ2VJLRfJKHqmi9UahSrw0AXD0FNH3AkAbFF715XTxLjzaTW4jnJ56OscsR7lstUeQRvQ'
    },
    {
        id: 3,
        name: 'SALA 3',
        description: 'HI-GAIN',
        details: ['EVH 5150 III', 'Orange Rocker', 'Tama Starclassic'],
        price: 14000,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCITpNt1lDZ80rZGKnDWJugmhfr55xrCov3bgAFF_BWZ5YiiRhUdBVLh0O1HimaGTyR0jjNICIdRAUiGcGEEEYopwdXoDre_Rad4lc5qhRWxT69GlSJfyvqSAkG7R7IxU6VsCna6PZRL1Ac0lY53AoUITa9cWjZ1ZHnlrvCHGJkYnL8o9PGNuLdzQoDXTHrGnGhhphwliGcJ9o05wLtXdUSK659-wV55mNuDd1uMiQpY8Chr9nPx7j9502PCv5l35ss8Veh6w6GBsc'
    },
    {
        id: 4,
        name: 'SALA 4',
        description: 'STD',
        details: ['Roland JC-120', 'Hartke HD500', 'Yamaha Stage'],
        price: 10000,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBt9UE4-bTghJpQFrw43mYi5h4lHpbZrLr_F8ySdaNOOpEwDs6UpTSh1UKvC-UnGfVUIhklh0fIWqGjh3xYe-fblYpJFHoQ3aQbR_E6cuC1EGQtyg35hOp3d-EZ3e4wVt10tEG60T3rvDxE2J5Pfc4DtrNk3p7SLpZTF1lRoikLKas26BywGUdzuWMJBY8Lsl-EhY9gQvyxs2sBfgWhyXwUmYsxUqAP85i58VfDVkQB44DukAGANPOBj1iWLYMPTfm9DZgOPtKcl4A'
    }
];

// --- Routes ---

// Get Room Config
app.get('/api/rooms', (req, res) => {
    res.json(ROOMS);
});

// Login
app.post('/api/login', (req, res) => {
    const { password } = req.body;
    db.get("SELECT * FROM users WHERE username = 'admin'", (err, user) => {
        if (err || !user) return res.status(500).json({ error: 'Error interno' });

        if (bcrypt.compareSync(password, user.password_hash)) {
            const token = uuidv4();
            sessions[token] = { username: 'admin' };
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Contraseña incorrecta' });
        }
    });
});

// GET Public Availability (only time slots)
app.get('/api/availability', (req, res) => {
    db.all("SELECT room_id, date, time FROM reservations", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// GET All Reservations (Admin Only - full details)
app.get('/api/admin/reservations', requireAuth, (req, res) => {
    const { date, month } = req.query;
    let query = "SELECT * FROM reservations";
    let params = [];

    if (date) {
        query += " WHERE date = ?";
        params.push(date);
    } else if (month) {
        query += " WHERE date LIKE ?";
        params.push(`${month}%`);
    }

    db.all(query, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        // Transform for frontend if needed (room object structure)
        const formatted = rows.map(r => ({
            id: r.id,
            room: { id: r.room_id, name: r.room_name },
            date: r.date,
            time: r.time,
            contact: r.contact
        }));
        res.json(formatted);
    });
});

// POST New Reservation (Public)
app.post('/api/reservations', (req, res) => {
    const { room, date, time, contact } = req.body;

    if (!room || !date || !time) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    // Check availability
    db.get(
        "SELECT * FROM reservations WHERE room_id = ? AND date = ? AND time = ?",
        [room.id, date, time],
        (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            if (row) return res.status(409).json({ error: 'Horario ya reservado' });

            const id = uuidv4();
            const createdAt = new Date().toISOString();

            db.run(
                `INSERT INTO reservations (id, room_id, room_name, date, time, contact, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [id, room.id, room.name, date, time, contact, createdAt],
                function (err) {
                    if (err) return res.status(500).json({ error: err.message });
                    res.status(201).json({ id, room, date, time, contact });
                }
            );
        }
    );
});

// DELETE Reservation (Admin Only)
app.delete('/api/reservations/:id', requireAuth, (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM reservations WHERE id = ?", id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Reserva no encontrada' });
        res.json({ success: true });
    });
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Admin Panel: http://localhost:${PORT}/admin.html`);
});
