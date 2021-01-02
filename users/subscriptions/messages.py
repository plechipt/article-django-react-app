import graphene
from rx import Observable


class MessageSubsription(graphene.ObjectType):
    count_seconds = graphene.Int(up_to=graphene.Int())

    def resolve_count_seconds(root, info, up_to=5):
        return Observable.interval(1000)\
                            .map(lambda i: "{0}".format(i))\
                            .take_while(lambda i: int(i) <= up_to)
