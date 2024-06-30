const ResultUI = ({ htmlCode }: { htmlCode: string }) => {
    return (
        <div className="flex items-center !bg-white justify-center flex-1">
            <iframe
                src="/result.html"
                width={700}
                height={'60vh'}
                className="h-full"
            ></iframe>
        </div>
    )
}

export default ResultUI
