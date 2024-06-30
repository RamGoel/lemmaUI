const ResultUI = ({ htmlCode }: { htmlCode: string }) => {
    return (
        <div className="flex items-center !bg-white justify-center flex-1">
            <iframe
                src="/result.html"
                width={700}
                height={700}
                className=""
            ></iframe>
        </div>
    )
}

export default ResultUI
