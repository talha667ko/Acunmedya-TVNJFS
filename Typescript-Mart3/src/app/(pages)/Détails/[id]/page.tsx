
export default function Page({ params }: { params: { id: string } }) {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Détails du produit</h1>
            <p className="mt-4">ID du produit : {params.id}</p>
            {/* Vous pouvez ajouter d'autres détails ici */}
        </div>
    );
}