import { motion } from 'framer-motion';
import { Database, Code, Table as TableIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';

const createQueries = `-- ============================
-- DATABASE CREATION
-- ============================

CREATE DATABASE blood_donor_db;
USE blood_donor_db;

-- ============================
-- TABLE: Donor
-- ============================
CREATE TABLE Donor (
    donor_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL CHECK (age >= 18 AND age <= 65),
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    blood_group ENUM('A+','A-','B+','B-','AB+','AB-','O+','O-') NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) UNIQUE,
    city VARCHAR(100) NOT NULL,
    last_donation_date DATE,
    availability BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================
-- TABLE: Hospital
-- ============================
CREATE TABLE Hospital (
    hospital_id INT PRIMARY KEY AUTO_INCREMENT,
    hospital_name VARCHAR(200) NOT NULL,
    location VARCHAR(100) NOT NULL,
    contact VARCHAR(20)
);

-- ============================
-- TABLE: Request (Blood Request)
-- ============================
CREATE TABLE Request (
    request_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_name VARCHAR(100) NOT NULL,
    blood_group ENUM('A+','A-','B+','B-','AB+','AB-','O+','O-') NOT NULL,
    hospital_id INT,
    hospital_name VARCHAR(200),
    city VARCHAR(100) NOT NULL,
    contact VARCHAR(20) NOT NULL,
    required_date DATE NOT NULL,
    urgency ENUM('critical', 'high', 'normal') DEFAULT 'normal',
    status ENUM('pending', 'fulfilled', 'expired') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hospital_id) REFERENCES Hospital(hospital_id) ON DELETE SET NULL
);

-- ============================
-- TABLE: Donations
-- ============================
CREATE TABLE Donations (
    donation_id INT PRIMARY KEY AUTO_INCREMENT,
    donor_id INT NOT NULL,
    donation_date DATE NOT NULL,
    FOREIGN KEY (donor_id) REFERENCES Donor(donor_id) ON DELETE CASCADE
);`;

const sampleQueries = [
  { title: '1. Find all available donors of a specific blood group', sql: `SELECT name, blood_group, city, phone\nFROM Donor\nWHERE blood_group = 'O+' AND availability = TRUE;` },
  { title: '2. Count donors by blood group', sql: `SELECT blood_group, COUNT(*) AS total_donors\nFROM Donor\nGROUP BY blood_group\nORDER BY total_donors DESC;` },
  { title: '3. Find eligible donors (3-month rule)', sql: `SELECT name, blood_group, last_donation_date\nFROM Donor\nWHERE availability = TRUE\n  AND (last_donation_date IS NULL\n       OR last_donation_date <= DATE_SUB(CURDATE(), INTERVAL 3 MONTH));` },
  { title: '4. Join: Match donors with pending requests', sql: `SELECT r.patient_name, r.blood_group, r.hospital_name,\n       d.name AS donor_name, d.phone AS donor_phone\nFROM Request r\nJOIN Donor d ON r.blood_group = d.blood_group\nWHERE r.status = 'pending'\n  AND d.availability = TRUE;` },
  { title: '5. Total donations per donor', sql: `SELECT d.name, d.blood_group, COUNT(dn.donation_id) AS total_donations\nFROM Donor d\nLEFT JOIN Donations dn ON d.donor_id = dn.donor_id\nGROUP BY d.donor_id, d.name, d.blood_group\nORDER BY total_donations DESC;` },
  { title: '6. Critical emergency requests with hospital info', sql: `SELECT r.patient_name, r.blood_group, r.required_date,\n       h.hospital_name, h.location\nFROM Request r\nJOIN Hospital h ON r.hospital_id = h.hospital_id\nWHERE r.urgency = 'critical' AND r.status = 'pending';` },
  { title: '7. Donors who have never donated', sql: `SELECT d.name, d.blood_group, d.city\nFROM Donor d\nLEFT JOIN Donations dn ON d.donor_id = dn.donor_id\nWHERE dn.donation_id IS NULL;` },
  { title: '8. Monthly donation statistics', sql: `SELECT MONTHNAME(donation_date) AS month,\n       COUNT(*) AS total_donations\nFROM Donations\nWHERE YEAR(donation_date) = 2025\nGROUP BY MONTH(donation_date)\nORDER BY MONTH(donation_date);` },
  { title: '9. City-wise donor availability', sql: `SELECT city,\n       COUNT(*) AS total_donors,\n       SUM(CASE WHEN availability = TRUE THEN 1 ELSE 0 END) AS available\nFROM Donor\nGROUP BY city\nORDER BY total_donors DESC;` },
  { title: '10. Subquery: Blood groups with most requests', sql: `SELECT blood_group, COUNT(*) AS request_count\nFROM Request\nWHERE blood_group IN (\n    SELECT blood_group FROM Donor\n    GROUP BY blood_group\n    HAVING COUNT(*) > 1\n)\nGROUP BY blood_group;` },
];

const erDiagram = `
ER Diagram Description:
═══════════════════════

Entities & Attributes:
─────────────────────
┌──────────────────────────────────────────────┐
│ DONOR                                         │
│ ● donor_id (PK)                               │
│ ○ name, age, gender, blood_group              │
│ ○ phone, email, city                          │
│ ○ last_donation_date, availability            │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ HOSPITAL                                      │
│ ● hospital_id (PK)                            │
│ ○ hospital_name, location, contact            │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ REQUEST                                       │
│ ● request_id (PK)                             │
│ ○ patient_name, blood_group, city             │
│ ○ contact, required_date, urgency, status     │
│ ◆ hospital_id (FK → Hospital)                 │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ DONATIONS                                     │
│ ● donation_id (PK)                            │
│ ○ donation_date                               │
│ ◆ donor_id (FK → Donor)                       │
└──────────────────────────────────────────────┘

Relationships:
──────────────
DONOR ──(1:N)──▶ DONATIONS
  "A donor can make many donations"

HOSPITAL ──(1:N)──▶ REQUEST
  "A hospital can have many blood requests"

DONOR ──(M:N via matching)──▶ REQUEST
  "Donors are matched to requests via blood_group"

Normalization: All tables are in 3NF (Third Normal Form)
  - No repeating groups (1NF ✓)
  - No partial dependencies (2NF ✓)
  - No transitive dependencies (3NF ✓)
`;

const SqlQueries = () => (
  <Layout>
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-10">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
            <Database className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Database & SQL Queries</h1>
          <p className="text-muted-foreground mt-2">Schema design, ER diagram, and sample queries for DBMS project</p>
        </div>

        <Tabs defaultValue="schema">
          <TabsList className="mb-6 w-full justify-start">
            <TabsTrigger value="schema" className="gap-2"><Code className="h-4 w-4" /> Schema</TabsTrigger>
            <TabsTrigger value="queries" className="gap-2"><TableIcon className="h-4 w-4" /> Sample Queries</TabsTrigger>
            <TabsTrigger value="er" className="gap-2"><Database className="h-4 w-4" /> ER Diagram</TabsTrigger>
          </TabsList>

          <TabsContent value="schema">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">SQL Table Creation Queries</h3>
              <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm font-mono text-foreground whitespace-pre-wrap">{createQueries}</pre>
            </div>
          </TabsContent>

          <TabsContent value="queries">
            <div className="space-y-4">
              {sampleQueries.map((q, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="rounded-xl border border-border bg-card p-5">
                  <h4 className="font-semibold text-foreground mb-3">{q.title}</h4>
                  <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm font-mono text-foreground whitespace-pre-wrap">{q.sql}</pre>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="er">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Entity-Relationship Diagram</h3>
              <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm font-mono text-foreground whitespace-pre-wrap">{erDiagram}</pre>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  </Layout>
);

export default SqlQueries;
