const ResultUI = ({ htmlCode }: { htmlCode: string }) => {
    return (
        <div className="flex items-center justify-center flex-1">
            <iframe src="/result.html" width={700} className="h-fit"></iframe>
        </div>
    )
}

export default ResultUI
