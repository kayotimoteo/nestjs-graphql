import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent
} from '@nestjs/graphql'

import { Student } from '../student/student.entity'
import { StudentService } from '../student/student.service'
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input'
import { Lesson } from './lesson.entity'
import { CreateLessonInput } from './lesson.input'
import { LessonService } from './lesson.service'
import { LessonType } from './lesson.type'

@Resolver(of => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService
  ) {}

  @Query(() => LessonType)
  lesson(@Args('id') id: string): Promise<LessonType> {
    return this.lessonService.getLesson(id)
  }

  @Query(() => [LessonType])
  lessons(): Promise<LessonType[]> {
    return this.lessonService.getLessons()
  }

  @Mutation(() => LessonType)
  createLession(
    @Args('createLessonInput') createLessonInput: CreateLessonInput
  ): Promise<LessonType> {
    return this.lessonService.createLession(createLessonInput)
  }

  @Mutation(() => LessonType)
  assingStudentsToLesson(
    @Args('assingStudentsToLesson')
    assignStudentsToLessonInput: AssignStudentsToLessonInput
  ): Promise<LessonType> {
    const { lessonId, studentsIds } = assignStudentsToLessonInput
    return this.lessonService.assignStudentsToLesson(lessonId, studentsIds)
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson): Promise<Student[]> {
    return this.studentService.getManyStudents(lesson.students)
  }
}
