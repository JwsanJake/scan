import { getAllFactories, getAllSubdivisions, getAllPositions } from "@/Queries/Admin"

export const mapFactories = async () => {
    const factories = await getAllFactories()

    const mappedFactories = factories ? factories.map((factory) => ({
        value: factory.id,
        label: factory.factory_name
    }))
    : []

    return {
        data: mappedFactories
    }
}

export const mapSubdivisions = async () => {
    const subdivisions = await getAllSubdivisions()

    const mappedSubdivisions = subdivisions ? subdivisions.map((subdivision) => ({
        value: subdivision.id,
        label: subdivision.subdivision_name,
    }))
    : []

    return {
        data: mappedSubdivisions
    }
}

export const mapPositions = async () => {
    const positions = await getAllPositions()

    const mappedPositions = positions ? positions.map((position) => ({
        value: position.id,
        label: position.position_name,
    }))
    : []

    return {
        data: mappedPositions
    }

}