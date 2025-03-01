"use client"

import { useState, useCallback } from "react"
import { api } from "@/lib/api"

interface Patient {
  id: number
  name: string
  email: string
  phone: string
  dateOfBirth: string
  address: string
}

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPatients = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.get("/api/patients")
      setPatients(data)
    } catch (err) {
      setError("Failed to fetch patients")
    } finally {
      setLoading(false)
    }
  }, [])

  const createPatient = useCallback(async (patient: Omit<Patient, "id">) => {
    setLoading(true)
    setError(null)
    try {
      const newPatient = await api.post("/api/patients", patient)
      setPatients((prevPatients) => [...prevPatients, newPatient])
      return newPatient
    } catch (err) {
      setError("Failed to create patient")
    } finally {
      setLoading(false)
    }
  }, [])

  const updatePatient = useCallback(async (id: number, patient: Partial<Patient>) => {
    setLoading(true)
    setError(null)
    try {
      const updatedPatient = await api.put(`/api/patients/${id}`, patient)
      setPatients((prevPatients) => prevPatients.map((p) => (p.id === id ? updatedPatient : p)))
      return updatedPatient
    } catch (err) {
      setError("Failed to update patient")
    } finally {
      setLoading(false)
    }
  }, [])

  const deletePatient = useCallback(async (id: number) => {
    setLoading(true)
    setError(null)
    try {
      await api.delete(`/api/patients/${id}`)
      setPatients((prevPatients) => prevPatients.filter((p) => p.id !== id))
    } catch (err) {
      setError("Failed to delete patient")
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    patients,
    loading,
    error,
    fetchPatients,
    createPatient,
    updatePatient,
    deletePatient,
  }
}

