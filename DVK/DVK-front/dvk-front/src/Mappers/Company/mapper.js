import { getCompanyById, getAllCompanies, getCompanyAffiliated } from "@/Queries/Company"
import dayjs from "dayjs"
import moment from "moment"

export const mapCompanyBaseInfo = async (id) => {
    const company = await getCompanyById(id)
    
    const mainInfo = company.mainInfo != null
        ?  {
            company_title: company.mainInfo.company_title,
            doc_number: company.mainInfo.doc_number,
            bin: company.mainInfo.bin,
            legal_address: company.mainInfo.legal_address,
            actual_address: company.mainInfo.actual_address,
            first_registration_date: dayjs(company.mainInfo.first_registration_date),
            last_registration_date: company.mainInfo.last_registration_date != null  
                ? dayjs(company.mainInfo.last_registration_date) : null,
            director: company.mainInfo.director,
            manufacture: company.mainInfo.is_manufacture,
            dealer: company.mainInfo.is_dealer, 
        }
        : {}
 
    const activities = company.activities != null ? company.activities : []
    const licenses = company.licenses != null ? company.licenses : []
    const files = company.files != null ? company.files : []
    return  {
         mainInfo,
         activities,
         licenses,
         files,
    }
} 

export const mapAllCompanies = async () => {
    const companies = await getAllCompanies()

    const mappedCompanies = companies != null
        ? companies.map((company) => ({
            identifier: company.identifier,
            company_title: company.company_title,
            bin: company.bin,
            first_registration_date: company.first_registration_date != null ? moment(company.first_registration_date).utc().format('DD-MM-YYYY') : 'не указано',
            last_registration_date: company.last_registration_date != null ? moment(company.last_registration_date).utc().format('DD-MM-YYYY') : 'не указано',
        }))
        : []

    return mappedCompanies
}

export const mapSearchedCompany = async () => {
    const companies = await getAllCompanies()

    const mappedCompanies = companies != null
        ? companies.map((company) => ({
            id: company.id,
            name: company.company_title,
            BIN: company.bin,
            identifier: company.identifier,
        }))
        : []

    return mappedCompanies
}

export const mapCompanyDirector = async (id) => {
    const company = await getCompanyById(id)

    return {
        director: company.mainInfo.director != null ? company.mainInfo.director : 'Не указано' 
    }
}

export const mapCompanyAffiliated = async (id) => {
    const affiliations = await getCompanyAffiliated(id)

    const mappedAffiliations = affiliations != null
        ? affiliations.data.map((affiliation) => ({
            identifier: affiliation.affiliated,
            affiliationType: affiliation.affiliation_name,
        }))
        : []

    return  mappedAffiliations 
   
}