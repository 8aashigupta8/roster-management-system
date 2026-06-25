function StatsCard({

    title,

    value,
}) {

    return (

        <div
            style={{
                border:
                    "1px solid #ddd",

                padding:
                    "20px",

                borderRadius:
                    "8px",

                minWidth:
                    "200px",
            }}
        >

            <h3>

                {title}

            </h3>

            <h1>

                {value}

            </h1>

        </div>
    );
}

export default StatsCard;