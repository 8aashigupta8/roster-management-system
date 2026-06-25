function Table({

    columns,

    data,
}) {

    return (

        <table
            border="1"
            cellPadding="10"
        >

            <thead>

                <tr>

                    {
                        columns.map(
                            column => (

                                <th
                                    key={
                                        column.key
                                    }
                                >

                                    {
                                        column.title
                                    }

                                </th>
                            )
                        )
                    }

                </tr>

            </thead>

            <tbody>

                {
                    data.map(
                        row => (

                            <tr
                                key={
                                    row.id
                                }
                            >

                                {
                                    columns.map(
                                        column => (

                                            <td
                                                key={
                                                    column.key
                                                }
                                            >

                                                {
                                                    typeof row[column.key]
                                                        === "boolean"

                                                        ? (
                                                            row[column.key]
                                                                ? "Yes"
                                                                : "No"
                                                        )

                                                        : row[column.key]
                                                }

                                            </td>
                                        )
                                    )
                                }

                            </tr>
                        )
                    )
                }

            </tbody>

        </table>
    );
}

export default Table;