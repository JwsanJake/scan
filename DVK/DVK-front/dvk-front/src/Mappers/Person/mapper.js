import { getPersonById, getAllPersons } from "@/Queries/Person"
import { getPersonEducation } from "@/Queries/Person"
import dayjs from "dayjs"
import moment from "moment"

export const mapAllPersons = async () => {
    const persons = await getAllPersons()

    const mappedPersons = persons != null 
        ? persons.map((person) => ({
            identifier: person.identifier,
            last_name: person.last_name,
            first_name: person.first_name,
            middle_name: person.middle_name,
            iin: person.iin,
            birthdate: moment(person.birthdate).format("DD-MM-YYYY") 
        }))
        : []

    return { data: mappedPersons }
}

export const mapPersonById = async (id) => {
    const person = await getPersonById(id)
    
    const mappedPerson = person.mainInfo != null
        ? {
            first_name : person.mainInfo.first_name,
            last_name : person.mainInfo.last_name,
            middle_name : person.mainInfo.middle_name,
            birthdate : dayjs(person.mainInfo.birthdate),
            birthplace : person.mainInfo.birthplace,
            family_status : person.mainInfo.family_status,
            identification : person.mainInfo.identification,
            iin : person.mainInfo.iin,
            citizenship: person.mainInfo.citizenship,
            phone_number: person.mainInfo.phone_number,
            legal_address: person.mainInfo.legal_address,
            actual_address: person.mainInfo.actual_address,
        }
        : {}

    return { mainInfo: mappedPerson, files : person.files}
}

export const mapPersonView = async (id) => {
    const person = await getPersonById(id)
    
    const mappedPerson = person != null
        ? {
            first_name : person.mainInfo.first_name,
            last_name : person.mainInfo.last_name,
            middle_name : person.mainInfo.middle_name,
            birthdate : moment(person.mainInfo.birthdate).format("DD-MM-YYYY"),
            birthplace : person.mainInfo.birthplace,
            family_status : person.mainInfo.family_status,
            identification : person.mainInfo.identification,
            iin : person.mainInfo.iin,
            citizenship: person.mainInfo.citizenship,
            phone_number: person.mainInfo.phone_number,
            legal_address: person.mainInfo.legal_address,
            actual_address: person.mainInfo.actual_address,
        }
        : {}

    return mappedPerson
}

export const mapPersonEducation = async (id) => {
    const educations = await getPersonEducation(id)

    const mappedEducation = educations != null
        ? educations.map((education) => ({
            education_type: education.education_type,
            edu_institution_name: education.edu_institution_name,
            start_date: dayjs(education.start_date).year(),
            end_date: dayjs(education.end_date).get('year'),
            specialization: education.specialization,
            qualification: education.qualification,
        }))
        : []

    return mappedEducation
}

export const mapSearchedPersons = async () => {
    const persons = await getAllPersons()

    const mappedPersons = persons != null 
        ? persons.map((person) => ({
            id: person.id,
            name: person.last_name + person.first_name + person.middle_name,
            iin: person.iin,
            identifier: person.identifier,
        })) 
        : []

    return  mappedPersons 
}

export const mapEducation = (data) => {

    const mappedEducation = data != null
        ? {
            id: data.id,
            identifier: data.identifier,
            education_type: data.education_type,
            edu_institution_name: data.edu_institution_name,
            start_date: dayjs(data.start_date),
            end_date: dayjs(data.end_date),
            specialization: data.specialization,
            qualification: data.qualification,
        }
        : {}

    return mappedEducation
}

export const mapFamilyMember = (data) => {
    
    const mappedFamilyMember = data != null
        ? {
            id: data.id,
            identifier: data.identifier,
            family_status: data.family_status,
            last_name: data.last_name,
            first_name: data.first_name,
            middle_name: data.middle_name,
            iin: data.iin,
            birthdate: dayjs(data.birthdate),
            work_place: data.work_place,
        } 
        : {}

    return mappedFamilyMember
}

export const mapCareer = (data) => {

    const mappedCareer = data != null
        ? {
            id: data.id,
            identifier: data.identifier,
            company_name: data.company_name,
            start_date: dayjs(data.start_date),
            end_date: dayjs(data.end_date),
            job_position: data.job_position,
        }
        : {}

    return mappedCareer
}