





const EventPersonnelCheck = ({ event, mode }) => {
    const { id } = useParams()
    const navigate = useNavigat()
    const { addEvent } = useRelations()
    const [searchedEmployees, setSearchedEmployees] = useState([])
    const [searchedPersons, setSearchedPersons] = useState()
    const [selectedEmployeesTag, setSelectedEmployeesTag] = useState(null)
    const [selectedPersonsTag, setSelectedPersonsTag] = useState(null)
    const [isDirector, setIsDirector] = useState(false)
    const { userInfo } = useUserInfo()
    const executor = userInfo != null ? modifyExecutorInfo(userInfo.userName) : null
    const role = userInfo != null ? userInfo.userName.role_id : null

    const employeesRef = useRef(null)
    const personsRef = useRef(null)
    useOutsideClick(employeesRef, () => setSearchedEmployees())
    useOutsideClick(personsRef, () => setSearchedPersons())

    const methods = useForm({
        defaultValues: {
            ...event,
            event_status: event === null ? "В работе" : event.event_status
        },
    })

    const addEventPersonnel = useAddPersonnelCheck()
    const updateEventPersonnel = useUpdatePersonnelCheck()
    const employees = useAllEmployees()
    const persons = useSearchedPersons()

    const onSubmit = methods.handleSubmit(data => {
        data.identifier = id
        data.role_id = role

        try {
            updateEventPersonnel.mutate(data, {
                onSuccess: () => {
                    showSuccess("Обновлены данные о проверке кандидата")
                    navigate(`/events`)
                }
            })
        }
        catch (error) {
            showError("Не удалось обновить данные о проверке кандидата")
        }
    })

    const addSubject = methods.handleSubmit(data => {
        data.event_create_executor = executor.executor
        data.executor_subdivision = executor.subdivision
        data.role_id = role
        data.is_supervisor = isDirector

        try {
            addEventPersonnel.mutate(data, {
                onSuccess: (response) => {
                    showSuccess(`${response.data}`)
                    addEvent(response.data)
                    navigate(`/persons/add`)
                },
                onError: () => {
                    showError("Не удалось добавить проверку кандидата")
                },
            })
        }
        catch (error) {
            showError(error)
        }
    })
}