function PageHeader({

    title,

    subtitle,
}) {

    return (

        <div
            style={{
                marginBottom:
                    "20px",
            }}
        >

            <h1>

                {title}

            </h1>

            {

                subtitle && (

                    <p>

                        {subtitle}

                    </p>
                )
            }

        </div>
    );
}

export default PageHeader;