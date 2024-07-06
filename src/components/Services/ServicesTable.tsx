import {
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Flex,
  Checkbox,
  Button,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
  InputGroup,
  Input,
  InputRightElement,
  Select,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberDecrementStepper,
} from "@chakra-ui/react"

import {
  MdChevronLeft,
  MdChevronRight,
  MdDelete,
  MdFirstPage,
  MdLastPage,
} from "react-icons/md"
import { FaSearch, FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa"

import {
  ColumnOrderState,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useMemo, useState } from "react"
import LoadingSpinner from "../LoadingSpinner"
import ErrorMessage from "../ErrorMessage"
import DeleteServiceModal from "./DeleteServiceModal"
import { useGetServicesQuery } from "../../api/services.api"

export default function ServicesTable() {
  const [currentSP, setCurrentSP] = useState("")
  const [currentService, setCurrentService] = useState("")

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "description",
        header: "Description",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cell: (info: any) => info.getValue()?.substring(0, 20) + "...",
      },
      {
        accessorKey: "price",
        header: "Price",
      },
      {
        accessorKey: "category",
        header: "Category",
      },

      {
        accessorKey: "location",
        header: "Location",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cell: (info: any) =>
          info.getValue()?.locality + ", " + info.getValue()?.city,
      },
      {
        accesorKey: "actions",
        header: "Actions",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cell: (info: any) => (
          <IconButton
            aria-label="Delete Service Provider"
            icon={<MdDelete />}
            size="sm"
            fontSize="xl"
            variant="outline"
            colorScheme="red"
            onClick={() => {
              setCurrentSP(info.row.original.username)
              setCurrentService(info.row.original.service_name)
              onDeleteOpen()
            }}
            title="Delete Service Provider"
          />
        ),
      },
    ],
    [onDeleteOpen]
  )

  const { isLoading, error, data } = useGetServicesQuery()

  const [columnVisibility, setColumnVisibility] = useState({})
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [sorting, setSorting] = useState<SortingState>([])

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })

  const table = useReactTable({
    data: data || [],
    columns,
    state: {
      columnVisibility,
      columnOrder,
      sorting,
      pagination,
      globalFilter,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
  })

  return (
    <TableContainer bg="white" borderRadius="md">
      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage error={error.message} />}
      <Heading my={2} textAlign="center">
        Services
      </Heading>
      <Flex justifyContent="center" gap="4" p="4">
        <InputGroup
          w="lg"
          bg="foreground"
          boxShadow="md"
          rounded="md"
          maxW="80%"
        >
          <Input
            onChange={(e) => setGlobalFilter(e.target.value)}
            outline="none"
            placeholder="Search"
          />
          <InputRightElement>
            <FaSearch opacity="0.5" />
          </InputRightElement>
        </InputGroup>
        <Popover>
          <PopoverTrigger>
            <Button colorScheme="blue">Options</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>Toggle Columns</PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              <Box>
                <Checkbox
                  isChecked={table.getIsAllColumnsVisible()}
                  onChange={table.getToggleAllColumnsVisibilityHandler()}
                >
                  Toggle All
                </Checkbox>
              </Box>
              {table.getAllLeafColumns().map((column) => (
                <Box key={column.id}>
                  <Checkbox
                    isChecked={column.getIsVisible()}
                    onChange={column.getToggleVisibilityHandler()}
                  >
                    {" "}
                    {`${column.columnDef.header}`}{" "}
                  </Checkbox>
                </Box>
              ))}
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
      <Table variant="striped">
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{ textAlign: "center" }}
                >
                  {header.isPlaceholder ? null : (
                    <Flex
                      justifyContent="center"
                      className={
                        header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : ""
                      }
                      onClick={header.column.getToggleSortingHandler()}
                      title={
                        header.column.getCanSort()
                          ? header.column.getNextSortingOrder() === "asc"
                            ? "Sort ascending"
                            : header.column.getNextSortingOrder() === "desc"
                            ? "Sort descending"
                            : "Clear sort"
                          : undefined
                      }
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <FaSortAlphaDown />,
                        desc: <FaSortAlphaDownAlt />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </Flex>
                  )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {data &&
            table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id} style={{ textAlign: "center" }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
        </Tbody>
      </Table>
      <Flex justifyContent="center" alignItems="center" gap="4" my="4">
        <Flex gap="2">
          <IconButton
            onClick={() => table.setPageIndex(0)}
            isDisabled={!table.getCanPreviousPage()}
            aria-label="go to first page"
            title={
              !table.getCanPreviousPage()
                ? "Already in first page"
                : "Go to first page"
            }
            icon={<MdFirstPage />}
          />
          <IconButton
            onClick={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
            aria-label="go to previous page"
            title={
              !table.getCanPreviousPage()
                ? "Already in first page"
                : "Go to previous page"
            }
            icon={<MdChevronLeft />}
          />
          <IconButton
            onClick={() => table.nextPage()}
            isDisabled={!table.getCanNextPage()}
            aria-label="go to next page"
            title={
              !table.getCanNextPage()
                ? "Already in last page"
                : "Go to next page"
            }
            icon={<MdChevronRight />}
          />
          <IconButton
            onClick={() => table.lastPage()}
            isDisabled={!table.getCanNextPage()}
            aria-label="go to last page"
            title={
              !table.getCanNextPage()
                ? "Already in last page"
                : "Go to last page"
            }
            icon={<MdLastPage />}
          />
        </Flex>
        <Flex justifyContent="center" alignItems="center" gap="2">
          <Text>
            Page <b>{table.getState().pagination.pageIndex + 1}</b> of{" "}
            <b>{table.getPageCount()}</b>
          </Text>
          <Select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[5, 8, 10, 12, 15].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </Flex>
        <Flex justifyContent="center" alignItems="center" gap="1">
          <Text>Go to page: </Text>
          <NumberInput
            defaultValue={table.getState().pagination.pageIndex + 1}
            min={1}
            max={table.getPageCount()}
            display="inline"
            w="72px"
            onChange={(value) => {
              const page = value ? Number(value) - 1 : 0
              table.setPageIndex(page)
            }}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>
      </Flex>
      <DeleteServiceModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        sp_username={currentSP}
        service_name={currentService}
      />
    </TableContainer>
  )
}
