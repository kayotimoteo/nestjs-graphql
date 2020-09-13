import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateStudentInput } from './create-student.input'
import { StudentService } from './student.service'
import { StudentType } from './student.type'

@Resolver(of => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query(() => StudentType)
  async student(@Args('id') id: string): Promise<StudentType> {
    return this.studentService.getStudent(id)
  }

  @Query(() => [StudentType])
  async students(): Promise<StudentType[]> {
    return this.studentService.getStudents()
  }

  @Mutation(() => StudentType)
  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput
  ): Promise<StudentType> {
    return this.studentService.createStudent(createStudentInput)
  }
}
