import { z } from 'zod';
import { bloodGroups, genders } from '../constants';

export const nameSchema = z.object({
  firstName: z.string({ error: 'First name is required' }).min(2).max(100),
  middleName: z.string({ error: 'Middle name is required' }).min(2).max(100),
  lastName: z.string({ error: 'Last name is required' }).min(2).max(100),
});

export const guardianSchema = z.object({
  fatherName: z.string().min(2).max(100),
  fatherDesignation: z.string().min(2).max(100),
  fatherContactNo: z.string().min(10).max(15),
  motherName: z.string().min(2).max(100),
  motherDesignation: z.string().min(2).max(100),
  motherContactNo: z.string().min(10).max(15),
});

export const localGuardianSchema = z.object({
  name: z.string().min(2).max(100),
  occupation: z.string().min(2).max(100),
  contactNo: z.string().min(10).max(15),
  address: z.string().min(10).max(200),
});

export const studentManagementSchema = z.object({
  // personal information
  name: nameSchema,
  gender: z.enum(genders),
  dateOfBirth: z.string({ error: 'Date of birth is required' }),
  bloodGroup: z.enum(bloodGroups, { error: 'Blood group is required' }),

  email: z.email(),
  contactNo: z.string().min(10).max(15),
  emergencyContactNo: z.string().optional(),
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),

  guardian: guardianSchema,
  localGuardian: localGuardianSchema,

  admissionSemester: z.string(),
  academicDepartment: z.string(),
});
